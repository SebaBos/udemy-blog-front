export class Post {

  category: any;
  user: any;

  constructor(
    public id: number,
    public user_id: number,
    public category_id: number,
    public title: string,
    public content: string,
    public image: string,
    public createdAt: any
  ) {
  }
}
