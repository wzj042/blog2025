/**
 * Rehype plugin to wrap images with title attributes in figure elements
 */
export const rehypeImageFigure = () => {
  return (tree: any) => {
    const visit = (node: any) => {
      if (node.type === 'element' && node.tagName === 'img' && node.properties?.title) {
        // Create figure element
        const figure: any = {
          type: 'element',
          tagName: 'figure',
          properties: {},
          children: [] as any[]
        };

        // Create figcaption element
        const figcaption: any = {
          type: 'element',
          tagName: 'figcaption',
          properties: {},
          children: [{
            type: 'text',
            value: node.properties.title
          }]
        };

        // Remove title from img and add to figure
        const imgWithoutTitle: any = {
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