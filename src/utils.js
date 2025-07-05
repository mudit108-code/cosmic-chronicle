import axios from 'axios';

export async function fetchEventsByDate(date) {
  const formattedDate = date.toISOString().slice(5, 10); // MM-DD
  try {
    const res = await axios.get(`https://api.le-systeme-solaire.net/rest/bodies?date=${formattedDate}`);
    const data = res.data.bodies;
    return data.slice(0, 3).map((d) => ({
      title: d.englishName,
      description: d.discoveryDescription || 'Event details not available.'
    }));
  } catch (err) {
    return [
      {
        title: 'Sample Event',
        description: 'On this day, a significant space event occurred.'
      }
    ];
  }
}
