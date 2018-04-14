import xml2js from 'xml2js'
const builder = new xml2js.Builder()

export default function js2xml(obj) {
  return builder.buildObject(obj)
}
