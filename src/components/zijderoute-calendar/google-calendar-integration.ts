import { CalendarEvents, StoredToken, VISIBILITY_TYPES } from './calendar.types';
import { format } from 'date-fns';

export function getCalendarEvents(id: string, email: string, start: Date, end: Date): Promise<CalendarEvents> {
  return getGoogleAccessToken(email)
  .then((accessToken) => {
    const startISO = start.toISOString();
    const endISO = end.toISOString();
    const baseUrl = `https://www.googleapis.com/calendar/v3/calendars/${id}/events`;
    const queryParams = `?timeMin=${startISO}&timeMax=${endISO}`;
    return fetch(baseUrl + queryParams, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  })
  .then(res => res.json())
  .then(({ items }) => {
    return items.reduce(
      (acc, item) => {
        if (item.visibility === VISIBILITY_TYPES.PUBLIC) {
          const startFormatted = format(new Date(item.start.dateTime), 'YYYY-MM-DD');
          const endFormatted = format(new Date(item.end.dateTime), 'YYYY-MM-DD');

          acc[startFormatted] = pushToArray(acc[startFormatted], item);
          if (startFormatted !== endFormatted) {
            acc[endFormatted] = pushToArray(acc[endFormatted], item);
          }
        }

        return acc;
      },
      {});
  });
}

export function getGoogleAccessToken(serviceAccountEmail) {
  const storedToken: StoredToken = JSON.parse(localStorage.getItem('googleAccessToken')) || null;

  if (storedToken && storedToken.exp > Date.now()) {
    return Promise.resolve(storedToken.token);
  }

  return fetch(`http://localhost:3000/getToken?serviceAccountEmail=${serviceAccountEmail}`)
  .then(res => res.json())
  .then(({ data }) => fetch('https://www.googleapis.com/oauth2/v4/token', {
    method: 'POST',
    body: JSON.stringify({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: data,
    }),
  }))
  .then(res => res.json())
  .then(({ access_token }) => {
    const storedToken: StoredToken = {
      token: access_token,
      exp: Date.now() + 3600000,
    };
    localStorage.setItem('googleAccessToken', JSON.stringify(storedToken));
    return access_token;
  });
}

function pushToArray(arr, item) {
  if (Array.isArray(arr)) {
    return [...arr, item];
  }

  return [item];
}
