import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Upload, ImagePlus, X } from "lucide-react";

const Add = ({ url, token }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "salad",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: { token },
      });
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "salad",
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while adding the item");
    }
  };

  const removeImage = () => {
    setImage(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-stone-800">Add New Item</h2>
          
        </div>

        <form
          onSubmit={onSubmitHandler}
          className="space-y-8 bg-white rounded-2xl shadow-lg p-8 border border-stone-100"
        >
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-stone-700">
              Item Image
            </label>
            <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${image ? 'border-orange-200' : 'border-dashed'} border-stone-300 rounded-xl hover:border-orange-400 transition-colors duration-200 relative group`}>
              <label htmlFor="image" className="w-full cursor-pointer">
                <div className="space-y-1 text-center">
                  {image ? (
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="mx-auto h-64 w-auto object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1 bg-orange-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <ImagePlus className="mx-auto h-16 w-16 text-stone-400 mb-4" />
                      <div className="flex flex-col items-center text-sm text-stone-600">
                        <span className="font-medium text-orange-500">Click to upload</span>
                       
                       
                      </div>
                    </div>
                  )}
                </div>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  className="sr-only"
                  required
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          
          <div className="grid grid-cols-1 gap-8">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-stone-700 mb-2"
              >
                Item Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={onChangeHandler}
                className="block w-full rounded-lg border-stone-300 shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors duration-200"
                placeholder="Enter Item name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-stone-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={data.description}
                onChange={onChangeHandler}
                className="block w-full rounded-lg border-stone-300 shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors duration-200"
                placeholder=" Item description"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-stone-700 mb-2"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={data.category}
                  onChange={onChangeHandler}
                  className="block w-full rounded-lg border-stone-300 shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors duration-200"
                >
                  <option value="Salad">Salad</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Deserts">Deserts</option>
                  <option value="Sandwich">Sandwich</option>
                  <option value="Cake">Cake</option>
                  <option value="Pure Veg">Pure Veg</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Noodles">Noodles</option>
                  <option value="Momo">Momo</option>
                  <option value="Coffee and Tea">Coffee and Tea</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-semibold text-stone-700 mb-2"
                >
                  Price (Rs.)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-500">
                    Rs.
                  </span>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={data.price}
                    onChange={onChangeHandler}
                    className="block w-full pl-8 rounded-lg border-stone-300 shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors duration-200"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border text-white rounded-3xl bg-orange-500 font-bold cursor-pointer"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;