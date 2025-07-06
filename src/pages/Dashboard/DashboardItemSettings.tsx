import { useState } from "react";
import { Button } from "../../components/Button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../components/Dialog";
import { Settings } from "lucide-react";

function DashboardItemSettings() {
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => setIsSettingsOpen(true)}>
                <Settings className="h-4 w-4" />
            </Button>

            <Dialog
                open={isSettingsOpen}
                onOpenChange={setIsSettingsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Item Settings</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">Settings Dashboard Item</div>
                    <DialogFooter>
                        <Button onClick={() => setIsSettingsOpen(false)}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default DashboardItemSettings;
