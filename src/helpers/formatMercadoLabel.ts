export function formatMercadoLabel(gameStats: string): string {
  switch (gameStats) {
    case "home":
      return "CASA";
    case "over25":
      return "MAIS DE 2.5";
    case "over35":
      return "MAIS DE 3.5";
    case "under25":
      return "MENOS DE 2.5";
    case "vis":
      return "VISITANTE";
    case "ambasMarcam":
      return "AMBAS MARCAM";
    default:
      return "";
  }
}
