export class Document {
  position: number;
  author: string;
  title: string;
  borrower: string;

  constructor(position: number, author: string, title: string, borrower: string) {
    this.position = position;
    this.author = author;
    this.title = title;
    this.borrower = borrower;
  }
}
