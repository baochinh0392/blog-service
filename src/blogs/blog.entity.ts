import { Column, Entity, PrimaryColumn } from 'typeorm';
 
@Entity()
export class Blog {
  @PrimaryColumn()
  public id: string;

  @Column()
  public title: string;
 
  @Column()
  public content: string;

  @Column()
  public image: string;
}
