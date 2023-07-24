/**
 * Returns the notification content and trigger for the 'inactive use reminder' notification.
 * This notification is triggered if the user has been inactive for 10 days.
 *
 * @returns {Object} The notification content and trigger.
 * @returns {Object.content} The notification title and body.
 * @returns {Object.trigger} The trigger settings for the notification.
 */
export const inactiveUseReminderNotification = () => {
  return {
    content: {
      title: "Time to party?",
      body: "It's been 10 days since you last used AYO. Maybe it is time to go on a little adventure? See what is around you!",
    },
    trigger: {
      seconds: 10 * 24 * 60 * 60, // 10 days in seconds
      repeats: true,
    },
  };
};

/**
 * Returns the notification content and trigger for the 'new match' notification.
 * This notification is triggered 10 seconds after it is scheduled.
 *
 * @returns {Object} The notification content and trigger.
 * @returns {Object.content} The notification title and body.
 * @returns {Object.trigger} The trigger settings for the notification.
 */
export const newMatchNotification = () => {
  return {
    content: {
      title: "New Match!",
      body: "There was a new match. Check it out",
    },
    trigger: {
      seconds: 10,
    },
  };
};

/**
 * Returns the notification content and trigger for the 'new people joined party' notification.
 * This notification is triggered 10 seconds after it is scheduled.
 *
 * @param {Object} data The data for the notification content.
 * @param {number} data.numberOfPeople The number of new people who joined.
 * @returns {Object} The notification content and trigger.
 * @returns {Object.content} The notification title and body.
 * @returns {Object.trigger} The trigger settings for the notification.
 *
 * @example
 * const { content, trigger } = newPeopleJoinedPartyNotification({ numberOfPeople: 90 });
 */
export const newPeopleJoinedPartyNotification = (data) => {
  const { numberOfPeople } = data;
  return {
    content: {
      title: "Check out who joined the party",
      body: `While you were away, ${numberOfPeople} new people joined. Check them out!`,
    },
    trigger: {
      seconds: 10,
    },
  };
};
