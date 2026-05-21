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

      // Menu folder with Surf Shack Menu + Food & Drink Specials
      S.listItem()
        .title('Menu')
        .child(
          S.list()
            .title('Menu')
            .items([
              S.listItem()
                .title('Surf Shack Menu')
                .child(
                  S.documentList()
                    .title('Surf Shack Menu')
                    .filter('_type == "menu"')
                ),
              S.listItem()
                .title('Food & Drink Specials')
                .child(
                  S.documentList()
                    .title('Food & Drink Specials')
                    .filter('_type == "specials"')
                ),
            ])
        ),

      // Include other types except ones we've manually placed
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['event', 'menu', 'specials'].includes(listItem.getId() ?? '')
      ),
    ])
}

export default deskStructure
