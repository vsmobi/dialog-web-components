```jsx
<Dragndrop />
```

```jsx
const DragOverlay = require('../DragOverlay/DragOverlay').default;
const DropZone = require('../DropZone/DropZone').default;
const handleDrop = (event, context) => {
  event.preventDefault();
  console.log('something dropped', { event, context });
};

<div>
  <DragOverlay name="drag1">
    <DropZone onDrop={handleDrop}>
      <div style={{ lineHeight: 20, textAlign: 'center', border: '1px solid red' }}>Drop here</div>
    </DropZone>
    <DropZone onDrop={handleDrop}>
      <div style={{ lineHeight: 20, textAlign: 'center', border: '1px solid red' }}>Drop here</div>
    </DropZone>
  </DragOverlay>
  <DragOverlay name="drag2">
    <section>
      <h1>Lorem ipsum dolor sit amet</h1>
      <DropZone onDrop={handleDrop}>
        <div style={{ lineHeight: 20, textAlign: 'center', border: '1px solid red' }}>Drop here</div>
      </DropZone>
    </section>
  </DragOverlay>
</div>
```
