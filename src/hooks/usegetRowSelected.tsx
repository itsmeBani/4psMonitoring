import {Row} from "@tanstack/react-table";
import {MemberData} from "../interfaces/Memberinterface.ts";

export const useGetRowSelected = () => {

    const getSelectedRow = async (getSelectedRowModel:Row<MemberData>[]) => {
        const RowSelected = getSelectedRowModel
        const selectedId = [];
        const selectedData = []
        for (let index = 0; index <= RowSelected.length - 1; index++) {
            selectedId.push(RowSelected[index]?.original?.user_id)
            selectedData.push(RowSelected[index]?.original)
        }
        return {selectedId, selectedData}
    }

    return {getSelectedRow}
};

