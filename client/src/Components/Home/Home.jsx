// Home.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Layout";
import "../../layout.css";
import { Button, Col, Row, Select, Card } from "antd";
import Doctor from "../Doctor";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";

const { Option } = Select;

function Home() {
  const [doctors, setDoctors] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [showSymptomsCard, setShowSymptomsCard] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [disease, setDisease] = useState("");

  const dispatch = useDispatch();
  const symptomsList = [
    "itching",
    "skin_rash",
    "nodal_skin_eruptions",
    "continuous_sneezing",
    "shivering",
    "chills",
    "joint_pain",
    "stomach_pain",
    "acidity",
    "ulcers_on_tongue",
    "muscle_wasting",
    "vomiting",
    "burning_micturition",
    "spotting_urination",
    "fatigue",
    "weight_gain",
    "anxiety",
    "cold_hands_and_feets",
    "mood_swings",
    "weight_loss",
    "restlessness",
    "lethargy",
    "patches_in_throat",
    "irregular_sugar_level",
    "cough",
    "high_fever",
    "sunken_eyes",
    "breathlessness",
    "sweating",
    "dehydration",
    "indigestion",
    "headache",
    "yellowish_skin",
    "dark_urine",
    "nausea",
    "loss_of_appetite",
    "pain_behind_the_eyes",
    "back_pain",
    "constipation",
    "abdominal_pain",
    "diarrhoea",
    "mild_fever",
    "yellow_urine",
    "yellowing_of_eyes",
    "acute_liver_failure",
    "fluid_overload",
    "swelling_of_stomach",
    "swelled_lymph_nodes",
    "malaise",
    "blurred_and_distorted_vision",
    "phlegm",
    "throat_irritation",
    "redness_of_eyes",
    "sinus_pressure",
    "runny_nose",
    "congestion",
    "chest_pain",
    "weakness_in_limbs",
    "fast_heart_rate",
    "pain_during_bowel_movements",
    "pain_in_anal_region",
    "bloody_stool",
    "irritation_in_anus",
    "neck_pain",
    "dizziness",
    "cramps",
    "bruising",
    "obesity",
    "swollen_legs",
    "swollen_blood_vessels",
    "puffy_face_and_eyes",
    "enlarged_thyroid",
    "brittle_nails",
    "swollen_extremeties",
    "excessive_hunger",
    "extra_marital_contacts",
    "drying_and_tingling_lips",
    "slurred_speech",
    "knee_pain",
    "hip_joint_pain",
    "muscle_weakness",
    "stiff_neck",
    "swelling_joints",
    "movement_stiffness",
    "spinning_movements",
    "loss_of_balance",
    "unsteadiness",
    "weakness_of_one_body_side",
    "loss_of_smell",
    "bladder_discomfort",
    "foul_smell_of urine",
    "continuous_feel_of_urine",
    "passage_of_gases",
    "internal_itching",
    "toxic_look_(typhos)",
    "depression",
    "irritability",
    "muscle_pain",
    "altered_sensorium",
    "red_spots_over_body",
    "belly_pain",
    "abnormal_menstruation",
    "dischromic_patches",
    "watering_from_eyes",
    "increased_appetite",
    "polyuria",
    "family_history",
    "mucoid_sputum",
    "rusty_sputum",
    "lack_of_concentration",
    "visual_disturbances",
    "receiving_blood_transfusion",
    "receiving_unsterile_injections",
    "coma",
    "stomach_bleeding",
    "distention_of_abdomen",
    "history_of_alcohol_consumption",
    "fluid_overload",
    "blood_in_sputum",
    "prominent_veins_on_calf",
    "palpitations",
    "painful_walking",
    "pus_filled_pimples",
    "blackheads",
    "scurring",
    "skin_peeling",
    "silver_like_dusting",
    "small_dents_in_nails",
    "inflammatory_nails",
    "blister",
    "red_sore_around_nose",
    "yellow_crust_ooze",
  ];

  const paragraphStyle = {
    fontSize: "24px",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    color: "#fff",
    backgroundColor: "#a3b5e3",
    padding: "15px",
    borderRadius: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token not found in localStorage");
        return;
      }
      dispatch(showLoading());
      const response = await axios.get("/api/user/get-all-approved-doctor", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response.data);
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };
  const [data, setData] = useState({});
  useEffect(() => {
    getData();
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8100/api/data");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === "symptoms") {
      setShowSymptomsCard(true);
    } else {
      setShowSymptomsCard(false);
    }
  };

  const handleSymptomsChange = async (value) => {
    setSelectedSymptoms(value);
  };

  const handleSubmit = async () => {
    try {
      const symptomsString = selectedSymptoms
        .map((symptom) => symptom.toLowerCase())
        .join(","); // Convert each symptom to lowercase and join them with commas

      const response = await axios.post(
        "http://localhost:8000/disease_predict",
        {
          symptoms: symptomsString,
        }
      );
      setDisease(response.data.doctor);
      // Handle response data
    } catch (error) {
      console.error("Error predicting doctor:", error);
    }
  };

  const handleFilter = (value) => {
    setSpecializationFilter(value);
  };

  const filteredDoctors = specializationFilter
    ? doctors.filter((doctor) => doctor.specialization === specializationFilter)
    : doctors;

  return (
    <Layout>
      {selectedOption === null ? (
        <div style={{ marginBottom: "20px" }}>
          <Button
            onClick={() => handleOptionSelect("symptoms")}
            style={{
              marginRight: "10px",
              backgroundColor: "#E0E9FF",
              borderColor: "#E0E9FF",
              color: "#000",
            }}
          >
            Find doctor based on symptoms
          </Button>
          <Button
            onClick={() => handleOptionSelect("specialization")}
            style={{
              backgroundColor: "#E0E9FF",
              borderColor: "#E0E9FF",
              color: "#000",
            }}
          >
            Find directly based on specialization
          </Button>
        </div>
      ) : (
        <div>
          {selectedOption === "specialization" ? (
            <div>
              <Select
                placeholder="Select Specialization"
                onChange={handleFilter}
                style={{ width: 200 }}
              >
                <Option value="Allergy & Immunology">
                  Allergy & Immunology
                </Option>
                <Option value="Dermatologist">Dermatologist</Option>
                <Option value="Allergist">Allergist</Option>
                <Option value="Gastroenterologist">Gastroenterologist</Option>
                <Option value="Hepatologist">Hepatologist</Option>
                <Option value="General Physician">General Physician</Option>
                <Option value="Endocrinologist">Endocrinologist</Option>
                <Option value="Pulmonologist">Pulmonologist</Option>
                <Option value="Cardiologist">Cardiologist</Option>
                <Option value="Neurologist">Neurologist</Option>
                <Option value="Orthopedic Surgeon">Orthopedic Surgeon</Option>
                <Option value="Infectious Disease Specialist">Infectious Disease Specialist</Option>
                <Option value="Pediatrician">Pediatrician</Option>
                <Option value="Orthopedic Surgeon">Orthopedic Surgeon</Option>
                <Option value="Rheumatologist">Rheumatologist</Option>
                <Option value="ENT Specialist">ENT Specialist</Option>
                <Option value="Urologist">Urologist</Option>
                <Option value="General Surgeon">General Surgeon</Option>
                <Option value="Vascular Surgeon">Vascular Surgeon</Option>
              </Select>
            </div>
          ) : (
            <div>
              {selectedOption === "symptoms" && (
                <div>
                  <Button
                    onClick={() => setShowSymptomsCard(!showSymptomsCard)}
                  >
                    {showSymptomsCard ? "Hide Symptoms" : "Add Symptoms"}
                  </Button>
                  {showSymptomsCard && (
                    <Card style={{ marginTop: "10px" }}>
                      <Select
                        mode="multiple"
                        placeholder="Select Symptoms"
                        style={{ width: "100%" }}
                        onChange={handleSymptomsChange}
                        value={selectedSymptoms}
                      >
                        {symptomsList.map((symptom, index) => (
                          <Option key={index} value={symptom}>
                            {symptom}
                          </Option>
                        ))}
                      </Select>
                      <p>For better accuracy enter atleast 4 symptoms. If you have less than 4 mild symptoms visit a General Physician for better treatment</p>
                      <Button onClick={handleSubmit}>Check</Button>
                    </Card>
                  )}
                  <br></br>
                  <hr></hr>
                  {disease && (
                    <p style={paragraphStyle}>
                      You should Visit a {disease}
                    </p>
                  )}
                  <Row gutter={20} style={{ marginTop: "23px" }}>
                    {filteredDoctors.map((doctor) => (
                      <Col span={8} xs={24} sm={24} lg={8} key={doctor._id}>
                        <Doctor
                          doctor={doctor}
                          selectedOption={selectedOption}
                        />
                      </Col>
                    ))}
                  </Row>
                </div>
              )}
            </div>
          )}
          <Row gutter={20} style={{ marginTop: "23px" }}>
            {filteredDoctors.map((doctor) => (
              <Col span={8} xs={24} sm={24} lg={8} key={doctor._id}>
                <Doctor doctor={doctor} selectedOption={selectedOption} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Layout>
  );
}

export default Home;
