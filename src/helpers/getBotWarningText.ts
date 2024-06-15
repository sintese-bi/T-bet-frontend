export const getBotWarningText = (accuracy: number) => {
  const percantege = accuracy * 100;
  if (percantege >= 90)
    return "Temos confiança que o mercado informado será o resultado dessa partida.";
  if (percantege >= 70)
    return "Pelas nossas análises existem boas chances do mercado indicado ser o resultado da partida.";
  if (percantege >= 51) return "Indicamos analisar o mercado antes de apostar";
  return "Cuidado, nosso algoritmo não recomenda entrar nessa partida.";
};
