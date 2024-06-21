import axios from "axios";
import moment from "moment";




async function getDoctors() {
  const res = await axios.get(`https://my-doctors-app.onrender.com/api/doctors`);
  return res.data;
}

async function getDoctorById(id) {
  const res = await  axios.get(`https://my-doctors-app.onrender.com/api/doctors/${id}`);
  return res.data;
}



const getQualification = (Qualification) => {
  if (!Qualification || !Array.isArray(Qualification)) return "Not Available";
  return Qualification.map((item) => item.certification).join(" | ");
};

const getDoctorSpecialities = (specialities) => {
  if (!specialities || !Array.isArray(specialities)) return "Not Available";
  return specialities.map((item) => item.name).join(" | ");
};


const getLanguages = (languages) => {
  if (!languages || !Array.isArray(languages)) return "Not Available";
  return languages.map((item) => item).join(", ");
};

const getSlotDate = (slotDate) => {
  const currentDate = new Date();
  const diff = Math.round((slotDate.getTime() - currentDate.getTime()) / (60 * 60 * 1000 * 24));
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const weekendDate = currentDate.getDate() + 7 + (6 - currentDate.getDay());

  if (diff === 0) {
    return "Today";
  }
  if (diff === 1) {
    return "Tomorrow";
  }
  if (diff < 7) {
    return days[slotDate.getDay()];
  }
  if (diff >= 7 && diff < 13 && slotDate.getDate() <= weekendDate) {
    return "Next Week";
  }
  if (diff > 13 && diff < 365 && slotDate.getFullYear() === currentDate.getFullYear()) {
    return moment(slotDate).format("D-MMM");
  }
  if (slotDate.getFullYear() > currentDate.getFullYear()) {
    return moment(slotDate).format("D-MMM-YYYY");
  }
};

async function getSlotsForDoctors(id){
  const request = await axios.get(`https://my-doctors-app.onrender.com/api/slot/doctor/${id}`)
  const response = await request.data;
  console.log(response)
  return response.data;
}

const getNextAvailableSlots = async (id) => {
  try {
    const resp = await getSlotsForDoctors(id);
    console.log(resp)
    if (resp.length) {
      const doctorSlots = [];
      resp.forEach((slot) => {
        if (slot.size !== slot.count) {
          doctorSlots.push(slot.startTime);
        }
      });
      if (doctorSlots.length) {
        return getSlotDate(new Date(doctorSlots[0]));
      }
    } else {
      return "Not available";
    }
  } catch (error) {
    console.error(error);
  }
};

export {
  getDoctors,
  getDoctorById,

  getQualification,
  getDoctorSpecialities,
  
  getLanguages,
  getNextAvailableSlots
};
