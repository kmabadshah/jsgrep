// jsgrep something somewhere.txt
const fs = require('fs')
const colors = require('colors');

// serach string format: /regex/flags

const l = (...s) => console.log(...s)

const search_string = process.argv[2]
const file = process.argv[3]

// read the file
const data = fs.readFileSync(file).toString()

// use the js regex engine to find 
const regex = eval(search_string)
let res;
if (search_string.split('/')[2].includes('g')) {
  res = [...data.matchAll(regex)]
}
else {
  res = [data.match(regex)]
}

const match_idx = []
for (item of res) {
  const match_beg_idx = item['index']
  const match_end_idx = match_beg_idx + item[0].length

  // store the beginning and ending match indexes,
  match_idx.push([match_beg_idx, match_end_idx])
}

let final_str = ""
let begn = 0
// replace the colors for only those indexes
for (item of match_idx) {
  const [match_beg_idx, match_end_idx] = item
  final_str += data.substring(begn, match_beg_idx)
  final_str += data.substring(match_beg_idx, match_end_idx).yellow

  begn = match_end_idx
}
final_str += data.substring(begn)

l(final_str)
