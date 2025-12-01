// components/PackageFetcher.jsx
import { useEffect, useState } from "react";
import { getPackageById } from "../services/getPackageById";

const usePackageFetcher = (id) => {
  const [loading, setLoading] = useState(false);
  const [packageData, setPackageData] = useState(null);

  const fetchPackageById = async () => {
    if (!id) return;
    setLoading(true);

    try {
      const data = await getPackageById(id);
      setPackageData(data);
    } catch (error) {
      console.error("Error fetching package:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPackageById();
  }, [id]);

  return { loading, packageData, refetch: fetchPackageById };
};

export default usePackageFetcher;
