export const seasonToNumber = (season: string) => {
  switch (season) {
    case "Spring":
      return 1;
    case "Autumn":
      return 2;
    case "Winter":
      return 3;
    default:
      return 0;
  }
};
