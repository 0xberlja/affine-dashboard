"use client";
import ShortenText from "@/components/global/ShortenText";
import axiosInstance from "@/config/axios";
import useAppDispatch from "@/hooks/global/useAppDispatch";
import useAppSelector from "@/hooks/global/useAppSelector";
import { setBest, setLastUpdate, setMiners } from "@/store/slices/global.slice";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
const ROWS = 20;
const AppPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [sortIndex, setSortIndex] = useState("weight");
  const dispatch = useAppDispatch();
  const { miners } = useAppSelector((state) => state.global);
  const filtered = useMemo(
    () =>
      miners
        .filter(
          (it) =>
            it.hotkey.toLowerCase().includes(searchText.toLowerCase()) ||
            it.detail.model.toLowerCase().includes(searchText.toLowerCase())
        )
        .sort((a, b) => {
          if (sortIndex === "weight") return b.weight - a.weight;
          if (sortIndex === "uid") return a.uid - b.uid;
          if (sortIndex === "block") return a.detail.block - b.detail.block;
          if (sortIndex === "model") return a.detail.model.localeCompare(b.detail.model[0]);
          if (sortIndex === "SAT")
            return b.envs.SAT.success_rate != a.envs.SAT.success_rate
              ? b.envs.SAT.success_rate - a.envs.SAT.success_rate
              : b.envs.SAT.count - a.envs.SAT.count;
          if (sortIndex === "ABD")
            return b.envs.ABD.success_rate != a.envs.ABD.success_rate
              ? b.envs.ABD.success_rate - a.envs.ABD.success_rate
              : b.envs.ABD.count - a.envs.ABD.count;
          if (sortIndex === "DED")
            return b.envs.DED.success_rate != a.envs.DED.success_rate
              ? b.envs.DED.success_rate - a.envs.DED.success_rate
              : b.envs.DED.count - a.envs.DED.count;
          if (sortIndex === "HVM")
            return b.envs.HVM.success_rate != a.envs.HVM.success_rate
              ? b.envs.HVM.success_rate - a.envs.HVM.success_rate
              : b.envs.HVM.count - a.envs.HVM.count;
          if (sortIndex === "ELR")
            return b.envs.ELR.success_rate != a.envs.ELR.success_rate
              ? b.envs.ELR.success_rate - a.envs.ELR.success_rate
              : b.envs.ELR.count - a.envs.ELR.count;
          if (sortIndex === "eli") return Number(b.eligible) - Number(a.eligible);
          if (sortIndex === "hot") return Number(b.detail.chute.hot) - Number(a.detail.chute.hot);
        }),
    [miners, searchText, sortIndex]
  );

  const eligible_amount = useMemo(() => filtered?.filter((it) => it.eligible)?.length || 0, [filtered]);
  const weight_amount = useMemo(() => filtered?.filter((it) => it.weight)?.length || 0, [filtered]);
  const hot_amount = useMemo(() => filtered?.filter((it) => it.detail.chute.hot)?.length || 0, [filtered]);

  const get_data = async () => {
    setIsLoading(true);
    try {
      const data: any = await axiosInstance.get("/api/miners");
      const result: any = data.data;
      dispatch(setMiners(result.data));
      dispatch(setLastUpdate(result.update));
      dispatch(setBest(result.best));
      toast.success("Data fetching success.");
    } catch {
      toast.error("Failed to get data.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    get_data();
  }, []); //eslint-disable-line
  return (
    <main className="p-24 pt-0">
      <div className="flex items-center justify-between mb-12">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border rounded-4 px-8 py-6 w-300"
          placeholder="Search By Hotkey and Model"
        ></input>
        <button
          className="cursor-pointer px-8 py-6 bg-sky-500 text-white rounded-4 hover:bg-sky-400 u-transition-color disabled:cursor-not-allowed disabled:bg-sky-800"
          onClick={get_data}
          disabled={isLoading}
        >
          {isLoading ? "Loading" : "Refresh"}
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th
              className={`cursor-pointer ${sortIndex == "uid" ? "font-bold" : ""}`}
              onClick={() => setSortIndex("uid")}
            >
              UID<sup>*</sup>
            </th>
            <th>Hotkey</th>
            <th
              className={`cursor-pointer ${sortIndex == "model" ? "font-bold" : ""}`}
              onClick={() => setSortIndex("model")}
            >
              Model<sup>*</sup>
            </th>
            <th>Rev</th>
            <th
              className={`cursor-pointer ${sortIndex == "block" ? "font-bold" : ""}`}
              onClick={() => setSortIndex("block")}
            >
              Block<sup>*</sup>
            </th>
            <th
              className={`cursor-pointer ${sortIndex == "SAT" ? "font-bold" : ""}`}
              onClick={() => setSortIndex("SAT")}
            >
              SAT<sup>*</sup>
            </th>
            <th
              className={`cursor-pointer ${sortIndex == "ABD" ? "font-bold" : ""}`}
              onClick={() => setSortIndex("ABD")}
            >
              ABD<sup>*</sup>
            </th>
            <th
              className={`cursor-pointer ${sortIndex == "DED" ? "font-bold" : ""}`}
              onClick={() => setSortIndex("DED")}
            >
              DED<sup>*</sup>
            </th>
            <th
              className={`cursor-pointer ${sortIndex == "HVM" ? "font-bold" : ""}`}
              onClick={() => setSortIndex("HVM")}
            >
              HVM<sup>*</sup>
            </th>
            <th
              className={`cursor-pointer ${sortIndex == "ELR" ? "font-bold" : ""}`}
              onClick={() => setSortIndex("ELR")}
            >
              ELR<sup>*</sup>
            </th>
            <th>L1</th>
            <th>L2</th>
            <th>L3</th>
            <th>L4</th>
            <th>L5</th>
            <th>Pts</th>
            <th
              className={`cursor-pointer ${sortIndex == "eli" ? "font-bold" : ""}`}
              onClick={() => setSortIndex("eli")}
            >
              Elig<sup>*</sup>
            </th>
            <th
              className={`cursor-pointer ${sortIndex == "weight" ? "font-bold" : ""}`}
              onClick={() => setSortIndex("weight")}
            >
              Weight<sup>*</sup>
            </th>
            <th
              className={`cursor-pointer ${sortIndex == "hot" ? "font-bold" : ""}`}
              onClick={() => setSortIndex("hot")}
            >
              Hot<sup>*</sup>
            </th>
            <th>Image</th>
            <th>GPU</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((miner) => {
            return (
              <tr key={miner.uid}>
                <td>{miner.uid}</td>
                <td>
                  <ShortenText text={miner.hotkey} uid="hotkey" index={miner.hotkey} />
                </td>
                <td>
                  <ShortenText text={miner.detail.model} uid="model" index={miner.hotkey} max={16} />
                </td>
                <td>
                  <ShortenText text={miner.detail.revision} uid="revision" index={miner.hotkey} />
                </td>
                <td>{miner.detail.block}</td>
                <td>
                  {(miner.envs.SAT.success_rate * 100).toFixed(2)} / {miner.envs.SAT.count}
                </td>
                <td>
                  {(miner.envs.ABD.success_rate * 100).toFixed(2)} / {miner.envs.ABD.count}
                </td>
                <td>
                  {(miner.envs.DED.success_rate * 100).toFixed(2)} / {miner.envs.DED.count}
                </td>
                <td>
                  {(miner.envs.HVM.success_rate * 100).toFixed(2)} / {miner.envs.HVM.count}
                </td>
                <td>
                  {(miner.envs.ELR.success_rate * 100).toFixed(2)} / {miner.envs.ELR.count}
                </td>
                <td>{miner.score["1"] || 0}</td>
                <td>{miner.score["2"] || 0}</td>
                <td>{miner.score["3"] || 0}</td>
                <td>{miner.score["4"] || 0}</td>
                <td>{miner.score["5"] || 0}</td>
                <td>{miner.pts}</td>
                <td>
                  {miner.eligible ? (
                    <span className="text-12 text-green-400 bg-green-300/50 px-4 py-2 rounded-2">Yes</span>
                  ) : (
                    <span className="text-12 text-red-400 bg-red-300/50 px-4 py-2 rounded-2">No</span>
                  )}
                </td>
                <td>{miner.weight ? miner.weight.toFixed(5) : "0.00"}</td>
                <td>
                  {miner.detail.chute.hot ? (
                    <span className="text-12 text-green-400 bg-green-300/50 px-4 py-2 rounded-2">Yes</span>
                  ) : (
                    <span className="text-12 text-red-400 bg-red-300/50 px-4 py-2 rounded-2">No</span>
                  )}
                </td>
                <td>{miner.detail.chute.image}</td>
                <td>{miner.detail.chute.node.gpu_count}</td>
              </tr>
            );
          })}
        </tbody>

        <tfoot>
          {filtered?.length > 0 ? (
            <tr>
              <td className="font-bold">{filtered?.length}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="font-bold">{eligible_amount}</td>
              <td className="font-bold">{weight_amount}</td>
              <td className="font-bold">{hot_amount}</td>
              <td></td>
            </tr>
          ) : (
            <tr>
              <td className="text-center" colSpan={ROWS}>
                No Data
              </td>
            </tr>
          )}
        </tfoot>
      </table>
    </main>
  );
};

export default AppPage;
