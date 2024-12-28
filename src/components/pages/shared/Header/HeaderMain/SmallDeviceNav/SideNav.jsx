"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Logs } from "lucide-react";

const SideNav = () => {
  return (
    <Drawer direction="right">
      {/* button */}
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Logs />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="bg-gray-100 rounded-t-[10px] mt-24 h-[80%] lg:h-[320px] fixed bottom-0 left-0 right-0 outline-none flex flex-col overflow-hidden">
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>
            But there is this gap. For the first couple years you make stuff,
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-md mx-auto space-y-4 text-gray-600">
            <p>
              Nobody tells this to people who are beginners, I wish someone told
              me. All of us who do creative work, we get into it because we have
              good taste.
            </p>
            <p>
              But there is this gap. For the first couple years you make stuff,
              it’s just not that good. It’s trying to be good, it has potential,
              but it’s not. But your taste, the thing that got you into the
              game, is still killer. And your taste is why your work disappoints
              you. A lot of people never get past this phase, they quit.
            </p>
            <p>
              Most people I know who do interesting, creative work went through
              years of this. We know our work doesn’t have this special thing
              that we want it to have. We all go through this. And if you are
              just starting out or you are still in this phase, you gotta know
              it's normal, and the most important thing you can do is do a lot
              of work.
            </p>
            <p>
              Put yourself on a deadline so that every week you will finish one
              story. It is only by going through a volume of work that you will
              close that gap, and your work will be as good as your ambitions.
              And I took longer to figure out how to do this than anyone I’ve
              ever met. It’s gonna take a while. It’s normal to take a while.
              You’ve just gotta fight your way through.
            </p>
          </div>
        </div>

        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SideNav;
