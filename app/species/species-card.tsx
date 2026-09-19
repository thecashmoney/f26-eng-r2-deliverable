"use client";
/*
Note: "use client" is a Next.js App Router directive that tells React to render the component as
a client component rather than a server component. This establishes the server-client boundary,
providing access to client-side functionality such as hooks and event handlers to this component and
any of its imported children. Although the SpeciesCard component itself does not use any client-side
functionality, it is beneficial to move it to the client because it is rendered in a list with a unique
key prop in species/page.tsx. When multiple component instances are rendered from a list, React uses the unique key prop
on the client-side to correctly match component state and props should the order of the list ever change.
React server components don't track state between rerenders, so leaving the uniquely identified components (e.g. SpeciesCard)
can cause errors with matching props and state in child components if the list order changes.
*/
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createBrowserSupabaseClient } from "@/lib/client-utils";
import type { Database } from "@/lib/schema";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EditSpeciesDialog from "./edit-species-dialog";
type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Species = Database["public"]["Tables"]["species"]["Row"] & {
  profiles: Profile | null;
};

export default function SpeciesCard({ species, sessionId }: { species: Species; sessionId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false); //deleting variables

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${species.scientific_name}?`)) {
      //confirm deletion
      return;
    }
    setIsDeleting(true);
    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.from("species").delete().eq("id", species.id);
    setIsDeleting(false);

    if (error) {
      return toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }

    router.refresh();
    return toast({
      title: "Species deleted!",
      description: `Successfully deleted ${species.scientific_name}.`,
    });
  };
  const displayInfo = () => {
    alert(
      "Scientific name: " +
        species.scientific_name +
        "\nCommon name: " +
        species.common_name +
        "\nTotal population: " +
        species.total_population +
        "\nKingdom: " +
        species.kingdom +
        "\nDescription: " +
        species.description +
        "\nContributed by: " +
        (species.profiles?.display_name ?? "Unknown"),
    );
  };
  return (
    <div className="m-4 w-72 min-w-72 flex-none rounded border-2 p-3 shadow">
      {species.image && (
        <div className="relative h-40 w-full">
          <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
        </div>
      )}
      <h3 className="mt-3 text-2xl font-semibold">{species.scientific_name}</h3>
      <h4 className="text-lg font-light italic">{species.common_name}</h4>
      <p>{species.description ? species.description.slice(0, 150).trim() + "..." : ""}</p>
      <Button className="mt-3 w-full" onClick={displayInfo}>
        Learn More
      </Button>
      {species.author === sessionId && (
        <div className="mt-2 flex w-full gap-2">
          <EditSpeciesDialog species={species} />
          <Button className="flex-1" variant="destructive" onClick={() => void handleDelete()} disabled={isDeleting}>
            <Icons.trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
