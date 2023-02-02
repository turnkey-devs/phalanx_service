import { Entity, Property } from "@mikro-orm/core"
import { ExampleModel } from "@server/core/domain/example/models/example.model"
import { mapToOne } from "@turnkeyid/utils-ts"
import { MikroOrmBaseEntity } from "@turnkeyid/utils-ts/utils"

@Entity({ collection: `example` })
export class ExampleEntity
  extends MikroOrmBaseEntity
  implements ExampleEntity {
  @Property()
  declare public id: string

  @Property()
  public name: string

  @Property()
  public description: string

  @Property()
  public created_at: Date

  @Property()
  public updated_at: Date

  static mapToModel = (entity: unknown) => {
    const result = mapToOne(ExampleModel.factory, entity)
    if (result.isOk) 
      return result.value
  
    throw result.error
  }
}
