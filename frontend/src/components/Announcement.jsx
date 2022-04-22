import "./announcement.css";
import { dateConversionNums } from "../utils/dateConversion";
import { MdDelete } from "react-icons/md";

function Announcement({ announcement }) {
  const announcementDate = dateConversionNums(announcement.updatedAt);

  return (
    <div className="announcement">
      <div className="heading">
        <span className="title">{announcement.title}</span>
        <span className="date">{announcementDate}</span>
      </div>
      {announcement.description && (
        <div className="description">{announcement.description}</div>
      )}
    </div>
  );
}

export default Announcement;