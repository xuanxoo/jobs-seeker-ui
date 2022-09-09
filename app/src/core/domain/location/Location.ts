class Location {
  city: string;

  private constructor(city: string) {
    this.city = city;
  }

  public static create(city: string): Location {
    if (city === '') {
      throw new Error('Location city cannot be empty');
    }
    return new Location(city);
  }
}

export { Location };
