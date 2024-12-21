"use client";

import { useState } from "react";
import SelectMovieSlot from "./SelectMovieSlot";

export default function MainContent() {
    // Initialize with on slot
    const [slots, setSlots] = useState([{ id: `slot-${Date.now()}`, movie: null }]);

    const addSlot = () => {
        const newSlotId = `slot-${Date.now()}`; // Unique id based on timestamp
        setSlots([...slots, { id: newSlotId, movie: null }]);
    };

    const handleMovieSelection = (slotId, movie) => {
        const updatedSlots = slots.map((slot) => (slot.id === slotId ? { ...slot, movie } : slot));
        setSlots(updatedSlots);
    };

    const removeSlot = (slotId) => {
        const updatedSlots = slots.filter((slot) => slot.id !== slotId);
        setSlots(updatedSlots);
    };

    return (
        <>
            <main className="container mx-auto px-4 pt-24 pb-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Compare Movies</h1>
                    <button
                        onClick={addSlot}
                        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
                    >
                        Add Movie +
                    </button>
                </div>

                {/* Movie Comparison Container */}
                <div className="grid gap-6 md:grid-cols-2">
                    {slots.map((slot) => (
                        <SelectMovieSlot
                            key={slot.id}
                            slotId={slot.id}
                            movie={slot.movie}
                            onMovieSelect={handleMovieSelection}
                            onRemoveSlot={removeSlot}
                        />
                    ))}
                </div>
            </main>
        </>
    );
}
