// ./deskStructure.ts
import {StructureResolver} from 'sanity/structure'

const deskStructure: StructureResolver = (S) => {
  const nowISOString = new Date().toISOString()

  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Upcoming Events')
        .schemaType('event')
        .child(
          S.documentList()
            .title('Upcoming Events')
            .filter('_type == "event" && date >= $now')
            .params({ now: nowISOString })
        ),

      // Include other types except 'event' to avoid duplication
      ...S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== 'event'
      ),
    ])
}

export default deskStructure
