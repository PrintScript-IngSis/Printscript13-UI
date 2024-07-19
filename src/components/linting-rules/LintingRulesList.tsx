import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import {
  useGetLintingRules,
  useModifyLintingRules,
} from "../../utils/queries.tsx";
import { queryClient } from "../../App.tsx";
import { LintRule } from "../../types/Rule.ts";

const LintingRulesList = () => {
  const [rules, setRules] = useState<LintRule[] | undefined>([]);

  const { data, isLoading } = useGetLintingRules();
  const { mutateAsync, isLoading: isLoadingMutate } = useModifyLintingRules({
    onSuccess: () => queryClient.invalidateQueries("lintingRules"),
  });

  useEffect(() => {
    setRules(data);
  }, [data]);

  const handleValueChange = (
    currentRule: string,
    newValue: string | number
  ) => {
    const newRules = {
      ...rules,
      [currentRule]: newValue,
    } as LintRule[];
    setRules(newRules);
  };

  const toggleRule = (currentRule: string) => () => {
    
    const newRules = {
      ...rules,
      // @ts-expect-error because can be nul
      [currentRule]: !rules[currentRule],
    } as LintRule[];
    setRules(newRules);
  };

  return (
    <Card style={{ padding: 16, margin: 16 }}>
      <Typography variant={"h6"}>Linting rules</Typography>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {isLoading || isLoadingMutate ? (
          <Typography style={{ height: 80 }}>Loading...</Typography>
        ) : (
          rules &&
          Object.keys(rules).map((rule) => {
            return (
              <ListItem
                key={rule}
                disablePadding
                style={{
                  height: 40,
                  display: "grid",
                  gridTemplateColumns: "42px 1fr 1fr",
                  width: "100%",
                }}
              >
                {typeof rules[rule] === "boolean" ? (
                  <Checkbox
                    edge="start"
                    checked={rules[rule]}
                    disableRipple
                    onChange={toggleRule(rule)}
                  />
                ) : (
                  <div></div>
                )}
                <ListItemText primary={rule} />
                {
                  typeof rules[rule] === "string" ? (
                  <TextField
                    variant={"standard"}
                    value={rules[rule]}
                    onChange={(e) => handleValueChange(rule, e.target.value)}
                  />
                ) : null}
              </ListItem>
            );
          })
        )}
      </List>
      <Button
        disabled={isLoading}
        variant={"contained"}
        onClick={() => mutateAsync(rules ?? [])}
      >
        Save
      </Button>
    </Card>
  );
};

export default LintingRulesList;
