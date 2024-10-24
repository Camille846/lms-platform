import {Button} from "@/components/ui/button";
import Link from "next/link";

const ModulesPage = () => {
    return (
        <div className="p-6">
            <Link href="/admin/create">
                <Button className="bg-SoulBlue hover:bg-SoulLightBlue">
                    New training
                </Button>
            </Link>
        </div>
    )
}

export default ModulesPage
