const templates = [
  {
    id: 0,
    title: 'Blank template',
    description:
      'Blank template where you can build the meeting agenda from scratch.',
    agenda: []
  },
  {
    id: 1,
    title: 'Scrum Retrospective',
    description:
      'Post Scrum meeting facilitated by the Scrum Master where the team discusses the just-concluded sprint and determines what could be changed that might make the next sprint more productive.',
    agenda: [
      {
        id: 1,
        title: 'Set the stage',
        description:
          "Welcome everyone to the retrospective meeting and establish the rules of engagement:\nEmbrace a positive spirit of continuous improvement and share whatever you think will help the team improve.\nDon't make it personal, don't take it personally.\nListen with an open mind, and remember that everyone's experience is valid (even those you don't share).\nSet the boundary of your discussion – is it that last sprint? the last quarter? since the project started? Be clear how far back you're going to go.\nEncourage the team to embrace an improvement mindset, away from blame.",
        duration: 30,
        color: '#6c5ce7',
        endHook: 'testHook'
      },
      {
        id: 2,
        title: 'What went well?',
        description:
          'Start the session on a positive note. Have each team member use green sticky notes to write down what they feel went well (one idea per sticky). As people post their stickies on the whiteboard, the facilitator should group similar or duplicate ideas together.\n\nDiscuss your ideas briefly as a team.',
        duration: 15,
        color: '#00b894',
        endHook: 'break'
      },
      {
        id: 3,
        title: '',
        duration: 10,
        color: '#b2bec3',
        endHook: 'testHook'
      },
      {
        id: 4,
        title: 'What needs improvement?',
        description:
          'Same structure as above, but using pink or red stickies. Remind your team that this is about actions and outcomes – not about specific people.',
        duration: 15,
        color: '#fd79a8',
        endHook: 'testHook'
      },
      {
        id: 5,
        title: 'Next steps',
        description:
          "Having identified what didn't go so well, what concrete actions can the team take to improve those things? Have your team use blue sticky notes to place ideas on the board. Group them and then discuss as a team, agree to which actions you will take, assign owners and a due date to get them DONE.\n\nThank everyone for their involvement and their honesty. Quickly run through the list of follow-up items, their owners and due dates.",
        duration: 15,
        color: '#fab1a0',
        endHook: 'testHook'
      }
    ]
  },
  {
    id: 2,
    title: 'SWOT ',
    description:
      'SWOT analysis is a strategic planning technique used to help a person or organization identify strengths, weaknesses, opportunities, and threats related to business competition or project planning.',
    agenda: [
      {
        id: 1,
        title: 'Introduction',
        description:
          'SWOT analysis is a strategic planning technique used to help a person or organization identify strengths, weaknesses, opportunities, and threats related to business competition or project planning.',
        duration: 30,
        color: '#e17055',
        endHook: 'testHook'
      },
      {
        id: 2,
        title: 'Strengths',
        description:
          'Characteristics of the business or project that give it an advantage over others',
        duration: 15,
        color: '#fdcb6e',
        endHook: 'break'
      },
      {
        id: 3,
        title: '',
        duration: 10,
        color: '#b2bec3',
        endHook: 'testHook'
      },
      {
        id: 4,
        title: 'Weaknesses',
        description:
          'Characteristics of the business that place the business or project at a disadvantage relative to others.',
        duration: 15,
        color: '#00b894',
        endHook: 'testHook'
      },
      {
        id: 5,
        title: 'Opportunities',
        description:
          'Elements in the environment that the business or project could exploit to its advantage',
        duration: 15,
        color: '#636e72',
        endHook: 'testHook'
      },
      {
        id: 6,
        title: 'Threats',
        description:
          'Elements in the environment that could cause trouble for the business or project.',
        duration: 15,
        color: '#81ecec',
        endHook: 'testHook'
      }
    ]
  },
  {
    id: 3,
    title: 'Brainstorming Session',
    description:
      'Use this template if you need a guided brainstorming session. It is based on the method of Alex F. Osborn for creative problem-solving',
    agenda: [
      {
        id: 1,
        title: 'Introduction',
        description:
          'There are only two rules in this exercise: No ideas are stupid (withhold critisism) and go for quantity. Wild ideas are welcome as they can make you see the problem in a new light.',
        duration: 10,
        color: '#a29bfe',
        endHook: 'testHook'
      },
      {
        id: 2,
        title: 'Write down ideas',
        description:
          'Every group member writes down as many ideas as he/she can think of.',
        duration: 30,
        color: '#e84393',
        endHook: 'testHook'
      },
      {
        id: 3,
        title: 'Pass around',
        description:
          'Pass the paper sheets with the ideas from person to person. Each person adds a new thought to the idea.',
        duration: 10,
        color: '#00cec9',
        endHook: 'break'
      },
      {
        id: 4,
        title: '',
        duration: 10,
        color: '#b2bec3',
        endHook: 'testHook'
      },
      {
        id: 5,
        title: 'Discuss',
        description: 'Discuss all the ideas from the sheets',
        duration: 30,
        color: '#ffeaa7',
        endHook: 'testHook'
      },
      {
        id: 6,
        title: 'Decide',
        description:
          'Vote for the different ideas. Each person has three votes each.',
        duration: 10,
        color: '#fab1a0',
        endHook: 'testHook'
      }
    ]
  }
];

module.exports = {
  templates
};
