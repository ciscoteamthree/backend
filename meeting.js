const meeting = {
  title: 'TestMeeting',
  startTime: '2019-10-25T12:19:04.365Z',
  agenda: [
    {
      id: 10,
      title: 'Introduction',
      description:
        'There are only two rules in this exercise: No ideas are stupid (withhold critisism) and go for quantity. Wild ideas are welcome as they can make you see the problem in a new light.',
      duration: 10,
      color: '#a29bfe'
    },
    {
      id: 11,
      title: 'Write down ideas',
      description:
        'Every group member writes down as many ideas as he/she can think of.',
      duration: 30,
      color: '#e84393'
    },
    {
      id: 12,
      title: 'Pass around',
      description:
        'Pass the paper sheets with the ideas from person to person. Each person adds a new thought to the idea.',
      duration: 10,
      color: '#00cec9'
    },
    {
      id: 13,
      title: 'Discuss',
      description: 'Discuss all the ideas from the sheets',
      duration: 30,
      color: '#ffeaa7'
    },
    {
      id: 14,
      title: 'Decide',
      description:
        'Vote for the different ideas. Each person has three votes each.',
      duration: 10,
      color: '#fab1a0'
    }
  ]
};

module.exports = {
  meeting
};
