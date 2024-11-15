import React from "react";
// editor
import {
  CollaborativeRichTextReadOnlyEditorWithRef,
  EditorReadOnlyRefApi,
  ICollaborativeRichTextReadOnlyEditor,
} from "@plane/editor";
// plane ui
import { Loader } from "@plane/ui";
// helpers
import { cn } from "@/helpers/common.helper";
import { getReadOnlyEditorFileHandlers } from "@/helpers/editor.helper";
// hooks
import { useMention } from "@/hooks/store";
import { useIssueDescription } from "@/hooks/use-issue-description";

type RichTextReadOnlyEditorWrapperProps = Omit<
  ICollaborativeRichTextReadOnlyEditor,
  "fileHandler" | "mentionHandler" | "value"
> & {
  descriptionBinary: string | null;
  descriptionHTML: string;
  projectId?: string;
  workspaceSlug: string;
};

export const CollaborativeRichTextReadOnlyEditor = React.forwardRef<
  EditorReadOnlyRefApi,
  RichTextReadOnlyEditorWrapperProps
>(({ descriptionBinary: savedDescriptionBinary, descriptionHTML, projectId, workspaceSlug, ...props }, ref) => {
  const { mentionHighlights } = useMention({});

  const { descriptionBinary } = useIssueDescription({
    descriptionBinary: savedDescriptionBinary,
    descriptionHTML,
  });

  if (!descriptionBinary)
    return (
      <Loader>
        <Loader.Item height="150px" />
      </Loader>
    );

  return (
    <CollaborativeRichTextReadOnlyEditorWithRef
      ref={ref}
      value={descriptionBinary}
      fileHandler={getReadOnlyEditorFileHandlers({
        projectId,
        workspaceSlug,
      })}
      mentionHandler={{
        highlights: mentionHighlights,
      }}
      {...props}
      // overriding the containerClassName to add relative class passed
      containerClassName={cn(props.containerClassName, "relative pl-3")}
    />
  );
});

CollaborativeRichTextReadOnlyEditor.displayName = "CollaborativeRichTextReadOnlyEditor";
