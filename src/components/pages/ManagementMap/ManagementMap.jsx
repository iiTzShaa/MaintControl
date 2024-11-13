import React, { useEffect, useState } from "react";
import NewSite from "../../../forms/NewSite/NewSite";
import Map from "../../map/Map";
import "./ManagementMap.css";

import ConstructionIcon from "@mui/icons-material/Construction";
import PolylineIcon from "@mui/icons-material/Polyline";
import { Fab } from "@mui/material";
import NewEquipment from "../../../forms/NewEquipment/NewEquipment";

const ManagementMap = () => {
  const [sites, setSites] = useState([]);
  const [isNewSiteFormOpen, setIsNewSiteFormOpen] = useState(false);
  const [isNewEquipmentFormOpen, setIsNewEquipmentFormOpen] = useState(false);
  const openNewSiteForm = () => {
    setIsNewSiteFormOpen(true);
  };

  const closeNewSiteForm = () => {
    setIsNewSiteFormOpen(false);
  };

  const openNewEquipmentForm = () => {
    setIsNewEquipmentFormOpen(true);
  };

  const closeNewEquipmentForm = () => {
    setIsNewEquipmentFormOpen(false);
  };

  const handleSaveNewSite = (newSiteData) => {
    console.log("New Site Data:", newSiteData);
    setSites((prevSites) => [...prevSites, newSiteData]);
  };

  const handleSaveNewEquipment = (newEquipmentData) => {
    console.log("New Equipment Data:", newEquipmentData);

    const updatedSites = sites.map((site) => {
      if (site.siteName === newEquipmentData.selectedSite) {
        const newMarker = {
          markerName: newEquipmentData.equipmentName,
          markerPoints: newEquipmentData.selectedLocation,
        };
        const updatedSiteMarkers = [...site.siteMarkers, newMarker];
        return {
          ...site,
          siteMarkers: updatedSiteMarkers,
        };
      }
      return site;
    });

    setSites(updatedSites);
  };

  return (
    <div className="task-container">
      <Map sites={sites} />
      <div className="floating-actions">
        <Fab color="primary" aria-label="add" onClick={openNewSiteForm}>
          <PolylineIcon />
        </Fab>
        <Fab color="secondary" aria-label="edit" onClick={openNewEquipmentForm}>
          <ConstructionIcon />
        </Fab>
      </div>
      <NewSite
        sites={sites}
        open={isNewSiteFormOpen}
        onClose={closeNewSiteForm}
        onSave={handleSaveNewSite}
      />
      <NewEquipment
        open={isNewEquipmentFormOpen}
        onClose={closeNewEquipmentForm}
        onSave={handleSaveNewEquipment}
        sites={sites}
      />
    </div>
  );
};

export default ManagementMap;
