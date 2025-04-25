export function formatSecondsToMinutes(seconds: number) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0'); /* Primeira parte: minutos */
  const secondsRemaining = String(Math.floor(seconds % 60)).padStart(2, '0'); /* Segunda parte: segundos (resto) */

  return `${minutes}:${secondsRemaining}`;
}
