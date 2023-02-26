export function getElementFromTemplate(templId) {
  const elem =
    document
      .getElementById(templId)
      .content
      .cloneNode(true);

  return elem;
}