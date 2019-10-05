export default function getNodes(str) {
  return new DOMParser().parseFromString(str, 'text/html').body.childNodes;
}

