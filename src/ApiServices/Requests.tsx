export const synonymSearch = async (word: string) => {
  const res = await fetch(`https://api.datamuse.com/words?ml=${word}`);
  return res.json();
}

export const rhymeSearch = async (word: string) => {
  const res = await fetch(`https://api.datamuse.com/words?rel_rhy=${word}`)
  return res.json();
}

export const adjectiveSearch = async (word: string) => {
  const res = await fetch(`https://api.datamuse.com/words?rel_jjb=${word}`)
  return res.json();
}