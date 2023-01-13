import { useEffect, useState, createRef } from "react";
import { useScreenshot } from "use-react-screenshot";

const MushroomItem = ({ selectedTab }) => {
  const [edible, setEdible] = useState(null);
  const [typeColor, setTypeColor] = useState();
  const [clipboardStats, setClipboardStats] = useState();
  const [description, setDescription] = useState();
  const [descriptionHeader, setDescriptionHeader] = useState();
  const [imagePath, setImagePath] = useState("");

  function getImagePath(id) {
    return new URL(`./../images/mushrooms/${id}.jpg`, import.meta.url).href;
  }

  useEffect(() => {
    if (selectedTab) {
      handleEdibleChange();
      handleTypeColorChange();
      handleClipboardStatsChange();
      handleDescriptionChange();
      setImagePath(getImagePath(selectedTab.id));
    }
  }, [selectedTab]);

  const handleDescriptionChange = () => {
    if (selectedTab) {
      if (selectedTab.diceRoll.dice.effect.type == 3) {
        setDescriptionHeader("Effekt");
        setDescription(selectedTab.diceRoll.description);
      } else {
        setDescriptionHeader("Info");
        setDescription(selectedTab.item.description.info);
      }
    }
  };

  const handleDownloadPlantStats = () => {
    if (selectedTab) {
      const txt = clipboardStats;
      const e = document.createElement("a");
      const file = new Blob([txt], { type: "text/plain;charset=utf-8" });
      e.href = URL.createObjectURL(file);
      e.download = "Stats for " + selectedTab.item.name_da + ".txt";
      document.body.appendChild(e);
      e.click();
    }
  };

  const handleClipboardStatsChange = () => {
    if (selectedTab) {
      const isEdible = selectedTab.item.edible ? "spiselig" : "giftig";
      const typeText = selectedTab.diceRoll.type.type;
      const roll =
        selectedTab.diceRoll.valueText +
        " " +
        (selectedTab.item.edible ? "hit points." : "poison damage.");
      let clipboardStats = "";
      clipboardStats += "Name:\n" + selectedTab.item.name_da + "(material)\n\n";
      clipboardStats += clipboardStats +=
        "Cost:\n" + selectedTab.diceRoll.dice.gp + "gp\n\n";
      "Notes:\nPlanten er " +
        isEdible +
        ". " +
        selectedTab.item.description.info +
        "\n\n";
      clipboardStats += "Description:\n";
      clipboardStats +=
        typeText.toLowerCase() == "condition"
          ? selectedTab.diceRoll.dice.effect.condition + ". "
          : roll;
      clipboardStats += "\nUdvinding " + selectedTab.group.extract + "\n";
      clipboardStats += "Form " + selectedTab.group.form + "\n";

      setClipboardStats(clipboardStats);
    }
  };
  const handleEdibleChange = () => {
    const edibleDescription = selectedTab.item.edible ? "Spiselig" : "Giftig";
    setEdible(edibleDescription);
  };
  const handleTypeColorChange = () => {
    let colors = ["no_color", "green", "red", "blue"];
    let color = colors[parseInt(selectedTab.diceRoll.dice.effect.type)];
    setTypeColor(color);
  };

  return (
    <>
      <div className=" flex grid-rows-1  w-full p-2">
        <div className="grid grid-cols-2 w-full p-2 flex ">
          <div className="text-lg text-left ml-5 text-3xl">
            <b> {selectedTab ? selectedTab.item.name_da : "Title"}</b>
          </div>

          <div className="object-right mr-10 text-right text-lg">
            <button
              onClick={() => {
                navigator.clipboard.writeText(clipboardStats);
              }}
              className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-5 border border-green-500 hover:border-transparent rounded"
            >
              <i className="fa fa-clipboard"></i>
            </button>
            <button
              onClick={handleDownloadPlantStats}
              id="download-btn"
              className="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-5 border border-blue-500 hover:border-transparent rounded"
            >
              <i className="fa fa-download"></i>
            </button>
          </div>
        </div>
      </div>

      <hr className="mr-5 ml-5" style={{ borderWidth: 2 }}></hr>
      <div className="text-lg text-center mx-auto flex grid grid-cols-2 grid-fixed mt-5 ml-5 mr-15">
        <div className=" text-left" style={{ paddingRight: "20px" }}>
          <ul>
            <li>
              <b style={{ fontSize: "20px" }}>Latinsk navn</b>
              <br />
              {selectedTab ? selectedTab.item.name_la : "Ukendt"}
            </li>
            <hr className="mr-5" />
            <li>
              <b style={{ fontSize: "20px" }}>Hat</b>
              <br />
              {selectedTab ? selectedTab.item.description.hatfarve : "Ukendt"}
            </li>
            <hr className="mr-5"></hr>
            <li>
              <b style={{ fontSize: "20px" }}>Lugt</b>
              <br />
              {selectedTab ? selectedTab.item.description.lugt : "Ukendt"}
            </li>
            <hr className="mr-5"></hr>
            <li>
              <b style={{ fontSize: "20px" }}>Smag</b>
              <br />
              {selectedTab ? selectedTab.item.description.smag : "Ukendt"}
            </li>
            <hr className="mr-5"></hr>
          </ul>
        </div>
        <div className="object-center ">
          <img
            src={selectedTab && imagePath}
            style={{
              borderRadius: "20%",
              maxWidth: "400px",
              maxHeight: "250px",
            }}
            className="ml-10"
          />
        </div>
      </div>
      <div className="text-lg grid grid-cols-2 gap-4 ml-5 mr-10 mt-2">
        <div className="span-1 mt-8">
          <span className="text-2xl">
            <b>{descriptionHeader}:</b>
          </span>
          <br />
          <span className="w-full p-0.5 bg-gray-600 mr-2"></span>

          <i> {selectedTab ? description : "Ukendt"}</i>
        </div>

        <div className="span-1">
          <h2 className="text-center text-3xl mr-14">
            <b>Stats</b>
          </h2>
          <div className="text-lg grid grid-cols-2 gap-4 ml-5 mr-10 ">
            <div className="span-1 ml-10">
              <ul>
                <li>Indtagelse:</li>
                <li>Type:</li>
                <li>{selectedTab && selectedTab.diceRoll.type.valueHeader}</li>
                <li>Værdi:</li>
                <li>Udvinding: </li>
                <li>Form:</li>
              </ul>
            </div>
            <div className="span-1  mb-20">
              <ul>
                <li className="ml-10"> {selectedTab && edible}</li>
                <li className="ml-10" style={{ color: typeColor }}>
                  {selectedTab && selectedTab.diceRoll.type.type}
                </li>
                <li>
                  <div
                    style={{
                      display: "flex",
                      height: "24px",
                      marginLeft: "40px",
                      color: typeColor,
                    }}
                  >
                    {typeColor != "blue" && selectedTab.diceRoll.valueText}
                    {typeColor == "blue" && "Læs effekt"}
                    <img
                      src={selectedTab.diceRoll.icon}
                      style={{ marginBottom: "-4px", marginTop: "5px" }}
                      width="20"
                    />
                  </div>
                </li>
                <li className="ml-10" style={{ borderColor: "yellow" }}>
                  {selectedTab && selectedTab.diceRoll.dice.gp}gp
                </li>
                <li className="ml-10">
                  {selectedTab && selectedTab.group.extract}
                </li>
                <li className="ml-10">
                  {selectedTab && selectedTab.group.form}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MushroomItem;
