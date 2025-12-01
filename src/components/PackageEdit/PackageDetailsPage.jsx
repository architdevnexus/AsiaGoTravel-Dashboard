import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePackageFetcher from "./PackageFetcher";
import { PackageProductPage } from "./PackageProductPage";
import OverviewSection from "./OverviewSection";
import { updatePackageById } from "../services/getAllPackage";

const PackageSlugPage = () => {
  const { id } = useParams();

  const { loading: fetchLoading, packageData, refetch } = usePackageFetcher(id);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    location: "",
    overview: "",
    days: "",
    nights: "",
    price: "",
    category: "",
    highlights: "",
    includes: "",
    excludes: "",
  });

  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (!packageData) return;

    // Parse tripDuration (string → JSON)
    let parsedDuration = { days: "", nights: "" };
    try {
      parsedDuration = JSON.parse(packageData.tripDuration);
    } catch (e) {
      console.log("Trip Duration parsing error");
    }

    const overviewObj = packageData?.overviewCategory?.[0] || {};

    setForm({
      title: packageData.title || "",
      location: packageData.location || "",
      overview: overviewObj.overview || "",
      days: parsedDuration.days || "",
      nights: parsedDuration.nights || "",
      price: packageData?.priceDetails?.[0]?.originalPrice || "",
      category: packageData?.subTripCategory?.main || "",
      highlights: overviewObj?.summary?.join(", ") || "",
      includes: overviewObj?.inclusions?.join(", ") || "",
      excludes: overviewObj?.exclusions?.join(", ") || "",
    });
  }, [packageData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const fd = new FormData();

      fd.append("title", form.title);
      fd.append("location", form.location);
      fd.append("overview", form.overview);

      fd.append(
        "tripDuration",
        JSON.stringify({ days: form.days, nights: form.nights })
      );

      fd.append("price", form.price);
      fd.append("category", form.category);
      fd.append("highlights", form.highlights);
      fd.append("includes", form.includes);
      fd.append("excludes", form.excludes);

      if (images.length > 0) {
        images.forEach((img) => fd.append("images", img));
      }

      if (thumbnail) {
        fd.append("thumbnail", thumbnail);
      }

      await updatePackageById(id, fd);
      alert("Package Updated Successfully!");
      refetch();
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }

    setLoading(false);
  };

  if (fetchLoading || !packageData)
    return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-5 pt-20">

      {/* FIXED → overviewCategory[0].images */}
      <PackageProductPage
        images={packageData?.overviewCategory?.[0]?.images || []}
        title={packageData?.title}
      />

      <OverviewSection overviewData={packageData} />

      <div className="">
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="mt-5 bg-blue-600 text-white px-6 py-2 rounded"
        >
          {loading ? "Updating..." : "Update Package"}
        </button>
      </div>
    </div>
  );
};

export default PackageSlugPage;
