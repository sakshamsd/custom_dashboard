import React, { useEffect } from "react";
import { CHART_TYPE } from "../../utils/constants";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getDataById } from "../../redux/reducer/dataSlice";

interface ChartsProps {
    type: ChartType;
    dataId: string | null; // Optional field to link to data source
}

function Charts({ type, dataId }: ChartsProps) {
    const { data, error, loading } = useSelector((state: RootState) => state.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDataById(dataId));
    }, [dataId, dispatch]);

    if (!dataId) {
        return <div>No Data ID provided</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    const returnChart = () => {
        switch (type) {
            case CHART_TYPE.BAR_CHART:
                return <BarChart data={data} />;
            case CHART_TYPE.LINE_CHART:
                return <LineChart data={data} />;
            case CHART_TYPE.PIE_CHART:
                return <PieChart data={data} />;
            default:
                return <div>No Chart</div>;
        }
    };
    return returnChart();
}

export default Charts;
