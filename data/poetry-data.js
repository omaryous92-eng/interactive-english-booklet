/* ============================================================
   poetry-data.js
   All poetry and literary terms data
   ============================================================ */

const poetryData = {
  literaryTerms: [
    { term: "Personification", definition: "Giving human characteristics to inanimate objects or things", example: "The crying moon — the poet personifies the moon as a crying human being." },
    { term: "Simile", definition: "A clear and direct comparison between two things that are different using 'like' or 'as'", example: "The clouds looked like cotton candy." },
    { term: "Metaphor", definition: "An indirect comparison between two unlike things that have something in common", example: "Her voice is a nice song." },
    { term: "Contrast", definition: "The use of opposite words to make the meaning clear", example: "I looked up and down." },
    { term: "Hyperbole", definition: "An extreme exaggeration used to make a point", example: "My grandmother is as old as the hills." },
    { term: "Rhyme Scheme", definition: "The pattern of rhyming words at the end of each line", example: "In winter, I get up at night (a) / And dress by yellow candle light. (a) / In summer, quite the other way (b) / I have to go to bed by day. (b)" },
    { term: "Alliteration", definition: "The repetition of the same sounds at the beginning of words in a line", example: "'I am busy,' said the sea. (repetition of /s/ sound)" },
    { term: "Repetition", definition: "The repetition of a sound, word or phrase for emphasis", example: "Inside the house I get ready / Inside the can I go to school / Inside the school I wait" }
  ],
  poems: {
    myHeartLeapsUp: {
      title: "My Heart Leaps Up",
      author: "William Wordsworth",
      text: `My heart leaps up when I behold
      A rainbow in the sky;
      So was it when my life began;
      So is it now I am a man;
      So be it when I shall grow old,
      Or let me die!
      The Child is father of the Man;
      And I could wish my days to be
      Bound each to each by natural piety.`,
      vocabulary: {
        "leaps": "jumps",
        "behold": "see",
        "bound": "joined together",
        "piety": "the showing and the feeling of deep respect for God"
      },
      literaryTerms: [
        { term: "Personification", lines: "My heart leaps up when I behold", explanation: "The poet gives the heart a human feature and depicts it as a man who can jump with joy." },
        { term: "Repetition", lines: "So was it when my life began; / So is it now I am a man; / So be it when I shall grow old", explanation: "The word 'so' is repeated three times." },
        { term: "Metaphor", lines: "And I could wish my days to be / Bound each to each by natural piety", explanation: "The poet gives life the image of a chain which is joined." },
        { term: "Paradox", lines: "The Child is father of the Man", explanation: "A statement which seems self-contradictory, yet has a reasonable and sensible meaning." }
      ]
    },
    ifPoem: {
      title: "If—",
      author: "Rudyard Kipling",
      summary: "A father advises his son to prepare himself to face life with its good and bad sides. If the son follows his father's advice, he will own the world and everything in it. Moreover, he will be a man in the full sense of the word.",
      literaryTerms: {
        stanza1: [
          { term: "Antithesis (Contrast)", examples: "keep your head × losing theirs; trust yourself × doubt you; lied about × don't deal in lies; being hated × don't give way to hating" },
          { term: "Alliteration", lines: "Or being lied about, don't deal in lies", explanation: "The consonant sound 'd' is repeated in 'don't' and 'deal'." },
          { term: "Repetition", lines: "Or being lied about, don't deal in lies, / Or being hated, don't give way to hating", explanation: "'Or being' is repeated twice." },
          { term: "Metaphor", lines: "If you can keep your head when all about you", explanation: "'Keep your head' is a metaphor for staying calm and cool." }
        ],
        stanza2: [
          { term: "Metaphor", lines: "If you can dream—and not make dreams your master;", explanation: "Dreams are compared to a person in control." },
          { term: "Antithesis", lines: "If you can meet with Triumph and Disaster,", explanation: "Triumph and Disaster are opposites." },
          { term: "Alliteration", lines: "Twisted by knaves to make a trap for fools,", explanation: "The consonant sound 'f' is repeated in 'for' and 'fools'." },
          { term: "Repetition", lines: "If you can dream—and not make dreams your master; / If you can think—and not make thoughts your aim; / If you can meet with Triumph and Disaster, / If you can bear to hear the truth you've spoken", explanation: "The clause 'If you can' is repeated four times." }
        ]
      }
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = poetryData;
}