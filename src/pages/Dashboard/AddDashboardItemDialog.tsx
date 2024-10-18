import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/Dialog";
import { Button } from "../../components/Button";
import { ITEM_TYPES } from "../../utils/constants";

interface AddDashboardItemDialogProps {
    isAddingItem: boolean;
    setIsAddingItem: () => void;
    addItem: (_item: ItemType) => void;
}

function AddDashboardItemDialog({
    isAddingItem,
    setIsAddingItem,
    addItem,
}: AddDashboardItemDialogProps) {
    return (
        <Dialog
            open={isAddingItem}
            onOpenChange={setIsAddingItem}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Dashboard Item</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    {Object.values(ITEM_TYPES).map((type) => (
                        <Button
                            key={type}
                            onClick={() => addItem(type as ItemType)}>
                            Add {type}
                        </Button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default AddDashboardItemDialog;
