import { useState } from "react";

const QrCode = () => {
  const defaultImg =
    "https://vyaparwebsiteimages.vypcdn.in/marketing-images/images/qr-code-generator/qr-code-generator-what-is.webp";
  const [img, setImg] = useState(defaultImg);
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState();
  const [qrSize, setQrSize] = useState();

  async function formData(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}*${qrSize}&data=${encodeURIComponent(
        qrData
      )}`;
      setImg(url);
    } catch (error) {
      console.error("Error in generating QR Code", error);
    } finally {
      setLoading(false);
    }
  }
  function downloadQR() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }
  return (
    <>
      <div className="bg-amber-400 bg-cover h-screen">
        <form
          onSubmit={formData}
          className="bg-cover sm:space-y-5  space-y-3 sm:p-5 p-2 max-w-md mx-auto"
        >
          <h1 className="sm:text-4xl text-xl font-bold text-center sm:mt-5">
            QR Code Generator
          </h1>
          {loading && (
            <p className="text-center font-bold text-red-600">
              Loading...Please wait!
            </p>
          )}
          <div className="flex items-center justify-center sm:p-4 p-2">
            {img && <img className="w-[250px]" src={img} alt="" />}
          </div>
          <div className="grid grid-cols-2 items-center justify-center p-2 ">
            <label
              className="block text-black font-medium sm:text-lg text-sm"
              htmlFor="datainput"
            >
              Data for QR code :
            </label>
            <input
              className="text-sm w-full px-4 py-2 border rounded focus:outline-none focus:border-gray-600"
              type="text"
              placeholder="Enter QR code data"
              value={qrData}
              onChange={(e) => setQrData(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 items-center justify-center p-2 ">
            <label
              className="block text-black font-medium sm:text-lg text-sm"
              htmlFor="sizeinput"
            >
              Image size (e.g., 150) :
            </label>
            <input
              className="text-sm w-full px-4 py-2 border rounded focus:outline-none focus:border-gray-600"
              type="number"
              placeholder="Enter QR code size"
              value={qrSize}
              onChange={(e) => setQrSize(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 p-2 space-x-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
              disabled={loading}
            >
              Generate QR Code
            </button>
            <button
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white"
              onClick={downloadQR}
            >
              Download QR Code
            </button>
          </div>
        </form>
        <div className="bg-amber-400 p-4 text-sm text-center">
          Made by{" "}
          <a
            className="hover:underline"
            target="_blank"
            href="https://github.com/SwethaDSalvatore"
          >
            Swetha Ramesh
          </a>
        </div>
      </div>
    </>
  );
};

export default QrCode;
