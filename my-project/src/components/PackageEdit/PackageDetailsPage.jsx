import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import { getPackageById } from '../services/getPackageById';
import { PackageProductPage } from "./PackageProductPage";
import OverviewSection from "./OverviewSection";

const PackageSlugPage = () => {
  const { id } = useParams(); // ✔ React Router Dynamic Param
  const [packageData, setPackageData] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetchPackageById();
  }, [id]);

  const fetchPackageById = async () => {
    try {
      const data = await getPackageById(id);
      console.log("Package by ID:", data);
      setPackageData(data);
    } catch (error) {
      console.error("Error fetching package:", error);
    }
  };

  if (!packageData)
    return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-5 pt-20">
      {/* Image Slider */}
      <PackageProductPage
        images={packageData?.images}
        title={packageData?.title}
      />

    
      <OverviewSection overviewData={packageData} />

 
    </div>
  );
};

export default PackageSlugPage;
