/**
 * Componente "fit-to-target": mede o .glb quando ele carrega, escala para `size`
 * (relativo à largura da imagem, que no MindAR vale 1) e centraliza na origem.
 * Assim qualquer modelo aparece no tamanho e no lugar certos, sem ajustar scale à mão.
 */
export function registerFitToTarget(): void {
  const AFRAME = window.AFRAME;
  if (!AFRAME || AFRAME.components["fit-to-target"]) return;
  const THREE = AFRAME.THREE;

  AFRAME.registerComponent("fit-to-target", {
    schema: { size: { type: "number", default: 0.6 } },
    init(this: any) {
      this.el.addEventListener("model-loaded", () => {
        const obj = this.el.getObject3D("mesh");
        if (!obj) return;

        obj.position.set(0, 0, 0);
        obj.scale.set(1, 1, 1);

        // Caixa envolvente em espaço local: não depende da pose do alvo.
        const box = new THREE.Box3();
        obj.traverse((m: any) => {
          if (!m.isMesh || !m.geometry) return;
          m.geometry.computeBoundingBox();
          const rel = new THREE.Matrix4();
          for (let n = m; n && n !== obj; n = n.parent) {
            n.updateMatrix();
            rel.premultiply(n.matrix);
          }
          box.union(m.geometry.boundingBox.clone().applyMatrix4(rel));
        });
        if (box.isEmpty()) return;

        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const k = this.data.size / (Math.max(size.x, size.y, size.z) || 1);

        obj.scale.setScalar(k);
        obj.position.copy(center).multiplyScalar(-k);
      });
    }
  });
}
