import {type SchemaTypeDefinition} from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'


import {eventType} from './eventType'
import {menuType} from './menuType'

// Export an array of all schema types for easy import in sanity.config.ts
export const schemaTypes: SchemaTypeDefinition[] = [
  blockContentType,


  eventType,
  menuType,
];
