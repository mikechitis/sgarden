import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Card as MuiCard,
    Grid,
    Typography,
    CircularProgress,
    Alert,
} from "@mui/material";

import Form from "../components/Form";
import { getProfile, updateProfile } from "../api/index.js";
import { useSnackbar } from "../utils/index.js";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updating, setUpdating] = useState(false);
    const formRef = useRef();
    const { showSnackbar } = useSnackbar();

    // Load profile on mount
    useEffect(() => {
        const loadProfile = async () => {
            try {
                setLoading(true);
                const response = await getProfile();
                if (response.success) {
                    setProfile(response.profile);
                    setError(null);
                } else {
                    setError(response.message || "Failed to load profile");
                }
            } catch (err) {
                setError("Error loading profile: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    const handleSubmit = async (values) => {
        try {
            setUpdating(true);
            const response = await updateProfile(values.username, values.email);

            if (response.success) {
                setProfile(response.profile);
                showSnackbar("Profile updated successfully", "success");
            } else {
                showSnackbar(response.message || "Failed to update profile", "error");
            }
        } catch (err) {
            showSnackbar("Error updating profile: " + err.message, "error");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error && !profile) {
        return (
            <Box sx={{ p: 2 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    const formContent = [
        {
            customType: "input",
            id: "username",
            placeholder: "Username",
            value: profile?.username || "",
            label: "Username",
        },
        {
            customType: "input",
            id: "email",
            placeholder: "Email",
            value: profile?.email || "",
            label: "Email",
        },
        {
            customType: "input",
            id: "role",
            placeholder: "Role",
            value: profile?.role || "",
            label: "Role",
            disabled: true,
        },
        {
            customType: "input",
            id: "createdAt",
            placeholder: "Member Since",
            value: new Date(profile?.createdAt).toLocaleDateString(),
            label: "Member Since",
            disabled: true,
        },
        {
            customType: "button",
            id: "submit",
            type: "submit",
            text: "Update Profile",
            buttonColor: "third",
        },
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
                        User Profile
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <MuiCard
                        sx={{
                            p: 3,
                            backgroundColor: "#1a1a1a",
                            border: "1px solid #333",
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
                            Profile Information
                        </Typography>

                        <Form
                            ref={formRef}
                            content={formContent}
                            validationSchema="profile"
                            onSubmit={handleSubmit}
                            disabled={updating}
                        />

                        {error && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {error}
                            </Alert>
                        )}
                    </MuiCard>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <MuiCard
                        sx={{
                            p: 3,
                            backgroundColor: "#1a1a1a",
                            border: "1px solid #333",
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
                            Account Details
                        </Typography>

                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Box>
                                <Typography variant="body2" sx={{ color: "#888", mb: 0.5 }}>
                                    User ID
                                </Typography>
                                <Typography variant="body1" sx={{ wordBreak: "break-all" }}>
                                    {profile?.id}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="body2" sx={{ color: "#888", mb: 0.5 }}>
                                    Role
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        textTransform: "capitalize",
                                        color:
                                            profile?.role === "admin" ? "#ff6b6b" : "#51cf66",
                                    }}
                                >
                                    {profile?.role}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="body2" sx={{ color: "#888", mb: 0.5 }}>
                                    Member Since
                                </Typography>
                                <Typography variant="body1">
                                    {new Date(profile?.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="body2" sx={{ color: "#888", mb: 0.5 }}>
                                    Last Active
                                </Typography>
                                <Typography variant="body1">
                                    {profile?.lastActiveAt
                                        ? new Date(profile.lastActiveAt).toLocaleDateString()
                                        : "Never"}
                                </Typography>
                            </Box>
                        </Box>
                    </MuiCard>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;
