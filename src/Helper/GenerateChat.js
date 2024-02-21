import { addDays, addHours, addMinutes, format } from "date-fns";
import { randomDigit } from "@/utils";
export const dynamic = "force-dyamic";

function GenerateChat(MessageObject) {
  let day = randomDigit(5, 8);
  const startChatfromThisDate = addDays(new Date(), -day);
  const currentTime = format(Date.now(), "h:mm aa");
  let startMin = Number(format(Date.now(), "mm")) - MessageObject.length + 1;

  const NumberOfMessagesPerDay = Math.ceil(MessageObject.length / day);
  let count = 1;

  const addDate = Array.from({ length: day }).map((_, index) => {
    return {
      date: format(addDays(startChatfromThisDate, count++), "LLLL d, yyyy"),
      dateId: index + 1,
      chat: MessageObject.slice(
        index === 0 ? 0 : index * NumberOfMessagesPerDay,
        index === 0
          ? NumberOfMessagesPerDay
          : NumberOfMessagesPerDay * (index + 1)
      ),
    };
  });
  const addTimeStamp = addDate.map(({ chat, date, dateId }, mainIndex) => {
    return {
      date,
      dateId,
      chatMessages: chat.map((props, index) => {
        const today = new Date();
        const min = today.setMinutes(0);

        const time = format(
          addMinutes(addHours(min, -day + mainIndex + 1), startMin++),
          "h:mm aa"
        );

        return {
          timeStamp:
            mainIndex === addDate.length - 1 && index === chat.length - 1
              ? currentTime
              : time,

          ...props,
        };
      }),
    };
  });

  return addTimeStamp;
}

export default GenerateChat;
