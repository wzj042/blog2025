import type { Plugin } from 'unified';

/**
 * Rehype plugin to wrap images with title attributes in figure elements
 */
export const rehypeImageFigure: Plugin = () => {
  return (tree: any) => {
    const visit = (node: any) => {
      if (node.type === 'element' && node.tagName === 'img' && node.properties?.title) {
        // Create figure element
        const figure = {
          type: 'element',
          tagName: 'figure',
          properties: {},
          children: []
        };

        // Create figcaption element
        const figcaption = {
          type: 'element',
          tagName: 'figcaption',
          properties: {},
          children: [{
            type: 'text',
            value: node.properties.title
          }]
        };

        // Remove title from img and add to figure
        const imgWithoutTitle = {
          ...node,
          properties: {
            ...node.properties,
            title: undefined
          }
        };

        figure.children = [imgWithoutTitle, figcaption];

        // Replace the img node with the figure node
        Object.assign(node, figure);
      }

      if (node.children) {
        node.children.forEach(visit);
      }
    };

    visit(tree);
  };
}; 