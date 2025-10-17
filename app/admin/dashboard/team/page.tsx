"use client";

import React from "react";
import {
  UserPlus,
  User,
  Edit3,
  Trash2,
  Mail,
  ShieldCheck,
  MoreVertical,
} from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Javed Khan",
    email: "admin@imast.ai",
    role: "Administrator",
    status: "Active",
    joined: "Aug 12, 2024",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@imast.ai",
    role: "Editor",
    status: "Active",
    joined: "Sep 5, 2024",
  },
  {
    id: 3,
    name: "Mark Patel",
    email: "mark@imast.ai",
    role: "Designer",
    status: "Inactive",
    joined: "Sep 20, 2024",
  },
  {
    id: 4,
    name: "Emily Chen",
    email: "emily@imast.ai",
    role: "Content Writer",
    status: "Active",
    joined: "Oct 1, 2024",
  },
];

const Team: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Team Management
          </h1>
          <p className="text-sm text-gray-500">
            View and manage team members, their roles, and access permissions.
          </p>
        </div>
        <button
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl shadow-sm hover:bg-primary-700 transition-colors text-sm font-medium"
          aria-label="Invite team member"
        >
          <UserPlus className="w-4 h-4" />
          Invite Member
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
            <tr>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Role</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Joined</th>
              <th className="px-6 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {teamMembers.map((member) => (
              <tr
                key={member.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-3 font-medium text-gray-900 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center text-white shadow">
                    <User className="w-4 h-4" />
                  </div>
                  {member.name}
                </td>
                <td className="px-6 py-3 text-gray-600">{member.email}</td>
                <td className="px-6 py-3 text-gray-700 flex items-center gap-2">
                  {member.role === "Administrator" && (
                    <ShieldCheck className="w-4 h-4 text-primary-600" />
                  )}
                  {member.role}
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      member.status === "Active"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-gray-500">{member.joined}</td>
                <td className="px-6 py-3 text-right">
                  <div className="flex justify-end items-center gap-2">
                    <button
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                      title="Send Email"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                      title="More actions"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-gray-100 text-primary-600"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {teamMembers.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No team members found. Invite your first member to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;
