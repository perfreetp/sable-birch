declare module "earcut" {
  type Data = number[];
  function earcut(data: Data, holeIndices?: number[] | null, dim?: number): number[];
  namespace earcut {
    function flatten(data: number[][][]): { vertices: number[]; holes: number[]; dimensions: number };
    function deviation(data: Data, holeIndices: number[] | null, dim: number, triangles: number[]): number;
  }
  export default earcut;
}
