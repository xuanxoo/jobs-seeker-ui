class Category {
  id: number;
  name: string;
  results: number;

  public constructor(id: number, name: string, results: number) {
    this.id = id;
    this.name = name;
    this.results = results;
  }
}

export { Category };
